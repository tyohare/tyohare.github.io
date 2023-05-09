  let scene, camera, renderer, mesh;
  let prevX, prevY;
  let horizontalRotationSpeed = 0.002;

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(4, 4, 8);
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new THREE.GLTFLoader();
    scene.background = new THREE.Color(0x191627);
    loader.load('assets/img/bear.glb', function(gltf) {
      mesh = gltf.scene;
      scene.add(mesh);
    });

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, .71);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // Add zoom feature
    // document.addEventListener('wheel', function(event) {
    //   event.preventDefault();
    //   camera.position.z += event.deltaY * 0.1;
    //   camera.position.x += event.deltaY * 0.1;

    // });

    // Add drag feature
    // document.addEventListener('mousedown', function(event) {
    //   event.preventDefault();
    //   prevX = event.clientX;
    //   prevY = event.clientY;
    //   document.addEventListener('mousemove', mouseMoveHandler, false);
    //   document.addEventListener('mouseup', mouseUpHandler, false);
    // }, false);

    // function mouseMoveHandler(event) {
    //   let deltaX = event.clientX - prevX;
    //   let deltaY = event.clientY - prevY;
    //   mesh.rotation.y += deltaX * 0.01;
    //   mesh.rotation.x += deltaY * 0.01;
    //   prevX = event.clientX;
    //   prevY = event.clientY;
    // }

    // function mouseUpHandler(event) {
    //   document.removeEventListener('mousemove', mouseMoveHandler, false);
    //   document.removeEventListener('mouseup', mouseUpHandler, false);
    // }

  }

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.y += horizontalRotationSpeed;
    renderer.render(scene, camera);
  }

  // function onWindowResize() {
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   camera.updateProjectionMatrix();
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  // }

  // window.addEventListener('resize', onWindowResize, false);

  init();
  animate();