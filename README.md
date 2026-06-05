# Genie — undefined dependency version crashes packageJson generation

`packageJson(...).stringify(...)` crashes with `TypeError: undefined is not an object (evaluating 'version.startsWith')` when a dependency map contains an undefined value.

## Reproduction

```bash
bun run repro
```

The script clones `overengineeringstudio/effect-utils` at commit `b0d1daea4e21468f9813f39a234732456d8e2764` into `.upstream/` and runs the normal `packageJson(...).stringify(...)` path against a synthetic dependency object.

## Expected

Genie should report a structured validation/generation error that identifies the malformed dependency value.

## Actual

Generation crashes inside `resolveDeps`:

```text
TypeError: undefined is not an object (evaluating 'version.startsWith')
    at resolveDeps (.../packages/@overeng/genie/src/runtime/package-json/mod.ts:414:9)
    at buildPackageJson (.../packages/@overeng/genie/src/runtime/package-json/mod.ts:521:21)
    at stringify (.../packages/@overeng/genie/src/runtime/package-json/mod.ts:722:11)
```

## Versions

- `overengineeringstudio/effect-utils`: `b0d1daea4e21468f9813f39a234732456d8e2764`
- Bun: `1.3.13`
- OS: Linux x64

## Related Issue

https://github.com/overengineeringstudio/effect-utils/issues/748
