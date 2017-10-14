requirejs(['utils/index'], (utils) => {
  requirejs(['main']);

  const { _, ko, math, jQuery } = utils;

  const esnextWarnings = document.querySelectorAll('.esnext-warning');
  esnextWarnings.forEach(warning => {
    warning.remove();
  });

  const actions = [];
  const act = () => {
    // TODO insert in order of effect
  };

  const getElevation = (x, y) => {
    return math.getNoiseField(x, y, 'elevation');
  };

  const getTemperature = (x, y, elevation) => {
    return math.getNoiseField(x, y, 'temperature') * (1 - elevation);
  };

  const getHumidity = (x, y, elevation) => {
    return math.getNoiseField(x, y, 'humidity') * (1 - elevation);
  };

  const getRoomType = (e, t, h) => {
    return e < 0.25 ? 'trench' : e < 0.5 ? 'water' : e < 0.75 ? 'land' : 'hill';
  };

  const typeIconMap = {
    'trench': 't',
    'water': '~',
    'land': '.',
    'hill': 'h'
  };

  const generateRoom = (x, y) => {
    const elevation = getElevation(x, y);
    const temperature = getTemperature(x, y, elevation);
    const humidity = getHumidity(x, y, elevation);
    const type = getRoomType(elevation, temperature, humidity);
    const typeIcon = typeIconMap[type];

    // TODO generate additional room features

    return {
      elevation,
      temperature,
      humidity,
      type,
      typeIcon
    };
  };

  const savedRooms = {};
  const getRoom = (x, y) => {
    // TODO load from long-saved data
    const roomIndex = x + ',' + y;
    const savedRoom = savedRooms[roomIndex];
    if (savedRoom) {
      return savedRoom;
    }

    return (
      savedRooms[roomIndex] = generateRoom(x, y)
    );
  };

  const xPosition = ko.observable(20);
  const yPosition = ko.observable(20);
  const rooms = ko.pureComputed(() => {
    const x = xPosition();
    const y = yPosition();
    return _.map(_.range(y - 3, y + 4), i => {
      return _.map(_.range(x - 3, x + 4), j => {
        return getRoom(j, i);
      });
    });
  });

  const isPassable = room => {
    if (room.type === 'water' || room.type === 'trench') {
      return false;
    }

    return true;
  };

  const move = (deltaX, deltaY) => {
    const destinationX = xPosition() + deltaX;
    const destinationY = yPosition() + deltaY;
    const destinationRoom = getRoom(destinationX, destinationY);

    if (isPassable(destinationRoom)) {
      xPosition(destinationX);
      yPosition(destinationY);
    }
  };

  // TODO design input shortcuts for actual game commands
  jQuery('body').on('keydown', (e) => {
    const code = e.keyCode;
    if (code === 37) {
      move(-1, 0);
    } else if (code == 38) {
      move(0, -1);
    } else if (code == 39) {
      move(1, 0);
    } else if (code == 40) {
      move(0, 1);
    }
  });
  
  // TODO move room-generation code elsewhere
  setTimeout(() => {
    ko.applyBindings({
      rooms
    }, document.querySelector('body'));
  }, 500);
});
