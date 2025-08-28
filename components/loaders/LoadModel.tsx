
'use client';
import { useThree, useLoader } from '@react-three/fiber';
import { GLTFLoader, DRACOLoader, KTX2Loader, MeshoptDecoder } from 'three-stdlib';
import * as THREE from 'three';

export default function LoadModel({ url }: { url: string }) {
  const gl = useThree((s) => s.gl);

  const gltf = useLoader(GLTFLoader, url, (loader) => {
    const draco = new DRACOLoader();
    draco.setDecoderPath('/decoders/draco/');
    (loader as GLTFLoader).setDRACOLoader(draco);

    const ktx2 = new KTX2Loader();
    ktx2.setTranscoderPath('/decoders/basis/');
    ktx2.detectSupport(gl);
    (loader as GLTFLoader).setKTX2Loader(ktx2);

    (loader as GLTFLoader).setMeshoptDecoder(MeshoptDecoder);
  });

  const scene = gltf.scene as THREE.Object3D;
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh) {
      mesh.frustumCulled = true;
      if (mesh.material && 'toneMapped' in mesh.material) {
        (mesh.material as any).toneMapped = true;
      }
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
  });

  return <primitive object={scene} />;
}
