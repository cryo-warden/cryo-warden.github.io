---
title: "Intelligence Explosion"
layout: page
order: 0
---

Intelligence Explosion is an educational game all about functional programming. It is currently a graphical program editor written to be used in the Unity game engine.

----

### Function Definitions

You can define a function by clicking and dragging already-defined functions into the definition space, and connecting inputs and outputs, which is also done by clicking and dragging.

The panel on the right side of the screen will feature tests corresponding to the function you are editing.

Constants are also represented by functions. Definitions for True and False can be seen in the left-hand panel alongside other logic functions.

![a screenshot of the function-definition interface][interface-screenshot]

----

### Color-Coded Types

Each data node has a color indicating which data type it expects. Nodes can only be connected to other nodes of the same color. There is one exception. A white node is allowed to be connected to a node of any color. This was chosen as an alternative to teaching players to work with generic types in a fully type-safe environment.

In the game's resource system, white nodes will be more difficult to obtain, in order to discourage their overuse.

----

### Efficiency

Efficiency is intended to be part of the gameplay.

Each data node is evaluated lazily. For instance, no matter how much logic is used on the inputs to the If function, only one of those inputs will be evaluated.

----

More screenshots and further description will soon appear on this page.

[interface-screenshot]: {{ '/assets/images/screenshots/intelligence-explosion/early-development/definition-interface.png' | relative_url }} "The function-definition interface at an early stage of development"
