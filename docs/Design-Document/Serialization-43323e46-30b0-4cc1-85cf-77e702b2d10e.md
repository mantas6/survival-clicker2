# Serialization

# Introduction

Serialization is used to convert  the current game state from the object to string format (and back), then to be transferred to other environments (e.g., main thread or browser storage)

# Usage

- used by extending `Serializable` class
- each property needs to be tagged as for when to serialize
    - currently there are two tags for serialization:
        - `emit` — when emitting to the main thread (used to display data in the view)
        - `store` — when saving game state to the storage
- properties that extend `Serializable` are serialized recursively

# Decorators

- Class
    - `@SerializeAllOn` — sets default tag(s) for all class properties, unless property is configured otherwise
- Property
    - `@SerializeOn` — sets tag(s) for a given property; overwrites `SerializeAllOn`
    - `@SerializeAs` — rewrites serialization process
    - `@UnserializeAs` — rewrites unserialization process
    - `@DonNotSerialize` — ignores `SerializeAllOn` for a single property if used