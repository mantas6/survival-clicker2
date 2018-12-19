# Stats

## Introduction

- two types of stats exist
  - Value
    - contains value (VAL) of the stat
    - has configurable minimum (MIN); defaults to zero if not specified
  - Container
    - extends value stat; also contains maximum value (MAX)
    - MAX is calculated using a provided callback
    - VAL can not exceed MAX; nor can not be lower than specified MIN

## Examples

- money *(Value)*
- health *(Container)*
- stomach *(Container)*

## Usage

Create an instance of either `Value` or `Container` classes, providing necessary constructor arguments. Must be a child of `Process` or `Action` classes.