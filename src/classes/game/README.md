# State

## Introduction

State is what holds all variable and static game data or configuration. When instantiating `State` class, all children object are instantiated at the same time. This allows for taking advantaged of TypeScripts static type checking.

Each state node has a reference to the root state object, this way every module can access global variables of the game.
