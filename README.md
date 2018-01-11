# KansaiHack

## Debugging

#### Delete All Events

```
meteor mongo
db.events.remove({})
```

#### Import Events

```
meteor shell
import { insertAllEvents } from 'meteor/kansaihack'
insertAllEvents()
```