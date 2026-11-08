# Third-party components

The original components retain their own licenses. This private repository is not an open-source release of the original application code.

| Component | Use | License / source |
| --- | --- | --- |
| Infinite 3D Head Scan, Lee Perry-Smith / Infinite Realities | Adapted reference mesh, calibration, and reference-only demo | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/), [InfiniteScan](https://github.com/keijiro/InfiniteScan) |
| BiSeNet ResNet18 face-parsing weights, Yakhyokhuja Valikhujaev | Bundled, lazily loaded semantic face parsing | [MIT](licenses/face-parsing-MIT.txt), [source / weights](https://github.com/yakhyo/face-parsing) |
| MediaPipe | Externally loaded face landmarks and head segmentation | [Apache 2.0](licenses/mediapipe-Apache-2.0.txt), [source](https://github.com/google-ai-edge/mediapipe) |
| ONNX Runtime | Externally loaded browser inference runtime | [MIT](licenses/onnxruntime-MIT.txt), [source](https://github.com/microsoft/onnxruntime) |
| Manrope | Self-hosted interface typeface | [SIL OFL 1.1](licenses/manrope-OFL.txt), [source](https://github.com/google/fonts/tree/main/ofl/manrope) |
| IBM Plex Mono | Self-hosted ASCII and code typeface | [SIL OFL 1.1](licenses/ibm-plex-mono-OFL.txt), [source](https://github.com/google/fonts/tree/main/ofl/ibmplexmono) |

The demo renderer is extracted from the application's reference model. It contains no uploaded photographs and no photo-fitted user geometry. See [docs/demo-provenance.json](docs/demo-provenance.json).

The interactive HTML exports retain the reference-scan credit. When sharing a text frame or a derivative model, include the scan attribution in the surrounding work as well.
