# ECS Text RPG Demo

A text RPG playable entirely via point and click.

I have opted to construct this web app by combining a stateless React system with a stateful game engine. This allows the use of standard game engine patterns alongside standard React patterns.

The stateful engine section can be seen as a separate server-like system in relation to a more normal React frontend. In fact, if I decide to invest money into servers, I may create a multiplayer version by taking advantage of this separation.

---

## ECS

You can find information about ECS game engines online. It's a relatively young design pattern with a lot of variance in implementations.

One major drawback to my work here is that JavaScript doesn't let you manage memory directly. This means that the huge performance optimizations available under ECS architecture are not really available. I won't worry about optimization at this stage, beyond ensuring that optimization will be possible if performance ever does become an issue.

Ideas for optimizations include array-localized-memory Component data, Archetype-based Component groupings, and dirty-flagging to avoid unnecessary processing for unchanged Components. All of these optimizations would rely on some abstraction around how a System accesses its relevant Components. The EntityQuery abstraction leaves a lot of room for small-footprint refactoring.

---

### Naming Conventions

System implementations must end their name with "System".

Components should not end their name with "Component". Any JSON-deserializable type may be treated as a Component, so they're not particularly special.

"TODO" comments in code are ideas for improvements after merging the feature branch.

"WIP" comments in code are ideas that MUST be addressed before merging the feature branch.

---

### Maybe TODO

- Create Audible Component to handle sounds as transient Entities.
- Create Dirty Component to support dirty-tracking.
- Create Query Factory to track baseline Archetype and subset Archetypes. This involves moving Query construction to System constructor, OR making a factory.
- Incorporate zod library, with TypeScript features, to validate JSON.
  - This is virtually required when implementing save/loading state or network APIs, or even just when hard-coded Entities become large pre-MVP.
- Design and implement a Conversation UI allowing a player to "mention" a topic they've seen and possibly trigger dialog from NPCs who have something to say.
  - This could be an interesting way to create some obscure exploration game mechanics, but probably, a player's known "topics" should just be used to filter the Conversation options they get from an NPC, to streamline discovery.
- Consolidate design pattern between using classes VS using plain object factories.
  - "Composition over inheritance" is a good principle to decide this. Hint, hint.
  - Counterpoint: This project is partially a LEARNING EXPERIENCE. Using different styles actually provides some value toward this core goal.
    - At minimum, ensure that there is a VERY clear distinction between type which should be defined as classes VS types that should not.

### TODO

- Solve the entity-reference deserialization problem.
- Make use of the "readonly" TypeScript keyword in the many, many places where that is intended.
- Design and implement `ConversationSystem`, allowing an Entity with the `ConversationListener` Component to gather "topics" from received messaged and use these to unlock new speech options.

### TODO Post-MVP

### DONE

- Move ActionSystem, PlayerSystem, AISystem, and the relevant components to a directory outside the library-style GameEngine directory. Essentially, anything that defines or consumes the Input and Output Events has a code-smell of being too specific to belong in GameEngine, rather than part of the core implementation.
- Add PlayerActionQueue resource to receive input from user, to be consumed within PlayerSystem.
- Allow mono-value Component definitions, not requiring object container for extremely simple components.
- Implement ComponentQueries abstraction, allowing Systems to fetch different intersections of components for different purposes.
  - This almost-entirely removes any need for a Resource type. For example, SpatialHash can just be a Component, and each instance of this Component can have its own state constructed with a different, configurable granularity.
  - The problem with omitting the Resource type? Components are meant to be easily serialized and deserialized, for network transmission and save/load functionality. Some types cannot be easily serialized, especially in-memory references. This is why I've been thinking about the Path type, visible alongside the base Component definition.
- Add queuing to EventSystem, such that an instance must have its `flush` method called in order to send queued events to all listeners. This enables full control for events to be processed before World updates, even if they wre somehow triggered during a previous update.

### SUPERSEDED

- Implement the Resource type to allow Systems to connect to each other and to external resources, like a data Library, a SpatialHash state, a VisionMap state, a SoundMap state, and more.
