# Speech models for Subtitles (self-hosted Whisper)

Subtitles runs Whisper in the user's browser (app/stt-worker.js, transformers.js 3.8.1).
The ONNX Runtime wasm already loads from app/vendor/. The model files are **not in the repo yet**,
because they could not be downloaded in the build sandbox (huggingface.co is blocked there, and no
npm or pip package carries the exact `onnx-community` files).

Until they are hosted here, Subtitles downloads the model from huggingface.co (a third-party
request; no audio or text is sent, only the model files are fetched). Once a model is hosted
here and listed in `index.json`, the worker sets `allowRemoteModels = false` for it and never
contacts Hugging Face.

## What to download

Source: `https://huggingface.co/onnx-community/<model>/resolve/main/<file>`.
Destination: `app/models/onnx-community/<model>/<file>` (keep the `onnx/` subfolder).
`app/Get speech model.command` does all of this and updates `index.json`.

Models (the ids the app offers in the "Accuracy" menu):
- `onnx-community/whisper-base` ("Fast")
- `onnx-community/whisper-small` ("Better, for Persian and Arabic")

Files per model:

| File | Needed |
|---|---|
| `config.json` | yes |
| `generation_config.json` | yes |
| `preprocessor_config.json` | yes |
| `tokenizer.json` | yes |
| `tokenizer_config.json` | yes |
| `special_tokens_map.json`, `vocab.json`, `merges.txt`, `added_tokens.json`, `normalizer.json` | recommended (small) |
| `onnx/encoder_model_quantized.onnx` | yes (q8, used without WebGPU and as the fallback) |
| `onnx/decoder_model_merged_quantized.onnx` | yes (q8) |
| `onnx/encoder_model.onnx` | optional (fp32 encoder, used with WebGPU) |
| `onnx/decoder_model_merged_q4.onnx` | optional (q4 decoder, used with WebGPU) |

If the two optional WebGPU files are missing, the worker falls back to the q8 files (it does not go online).

## Turn it on

After the files are in place, list the model in `app/models/index.json`:

```json
{ "hosted": ["onnx-community/whisper-base"] }
```

Only list a model whose required files are all present: a listed model loads from here only.

Notes:
- GitHub Pages refuses files over 100 MB. Check the file sizes; for whisper-small, host the large files elsewhere on your own domain, or leave that model unlisted (it then comes from Hugging Face).
- Licence: check the model card on Hugging Face (the openai/whisper-* cards say Apache-2.0; the OpenAI Whisper code repo is MIT). Add the licence to `app/licenses/` and `app/THIRD_PARTY_NOTICES.txt` when you host them (Apache-2.0 text is already in `app/licenses/`).
