var context = require.context('./src/javascript', true, /spec\.jsx$/);
context.keys().forEach(context);