# Signatures 🤗

This project is an effort to make modding Minecraft: Bedrock Edition easier.\
Please note that signatures/offsets on this website are generated automatically. There is a chance of them not working. Please do not rely on this and only use this for reference and learning purposes.

## Contributing
If you'd like to help with this project, there are two ways you can do that:

**1. Website Feature Updates**\
If you're sufficient in Svelte/Typescript development, feel free to add features you find missing! Just [open a pull request](https://github.com/HorionContinued/sigs/pulls) and we'll review it right away.

**2. Documenting functions**\
We're currently documenting functions/classes to make it easier for developers to find out what something is doing.\
You can help with that by opening a pull request with updated [metadata](/src/database/metadata.json)!\
Metadata is currently just the descriptions, but we aim for adding more useful properties later on.
If you want add a new description for an entry, create a new json object with the entry's name as key.\
Example:
```json
    "SomeClass::SomeNewFunction": {
        "description": "This amazing function does amazing stuff!"
    }
```

## Help
If you need help with something, feel free to join our [discord server](https://horion.download/discord).