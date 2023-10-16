# ECS Text RPG Demo

A text RPG playable entirely via point and click.

I have opted to construct this web app by combining a stateless React system with a stateful game engine. This allows the use of standard game engine patterns alongside standard React patterns.

The stateful engine section can be seen as a separate server-like system in relation to a more normal React frontend. In fact, if I decide to invest money into servers, I may create a multiplayer version by taking advantage of this separation.

---

## ECS

You can find information about ECS game engines online. It's a relatively young design pattern with a lot of variance in implementations.

One major drawback to my work here is that JavaScript doesn't let you manage memory directly. This means that the huge performance optimizations available under ECS architecture are not really available. I won't worry about optimization at this stage, beyond ensuring that optimization will be possible if performance ever does become an issue.

Ideas for optimizations include array-localized Component data, Archetype-based Component groupings, and dirty-flagging to avoid unnecessary processing for unchanged Components. All of these optimizations would rely on some abstraction around how a System accesses its relevant Components. For this reason, I am considering adding a ComponentQuery abstraction to Systems immediately, so that future refactoring has a limited footprint.

---

### Maybe TODO

- Create Audible Component to handle sounds as transient Entities.
- Create Dirty Component to support dirty-tracking.
- Create Query Factory to track baseline Archetype and subset Archetypes. This involves moving Query construction to System constructor.

### TODO

- Add PlayerActionQueue resource to receive input from user, to be consumed within PlayerSystem.

### DONE

- Implement ComponentQueries abstraction, allowing Systems to fetch different intersections of components for different purposes.
  - This almost-entirely removes any need for a Resource type. For example, SpatialHash can just be a Component, and each instance of this Component can have its own state constructed with a different, configurable granularity.
  - The problem with omitting the Resource type? Components are meant to be easily serialized and deserialized, for network transmission and save/load functionality. Some types cannot be easily serialized, especially in-memory references. This is why I've been thinking about the Path type, visible alongside the base Component definition.

### SUPERSEDED

- Implement the Resource type to allow Systems to connect to each other and to external resources, like a data Library, a SpatialHash state, a VisionMap state, a SoundMap state, and more.
