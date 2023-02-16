const express = require('express');
const app = express();
const db = require('./db');
const { Place, Thing, Souvenir, Person, conn } = db;


const port = process.env.PORT || 3000;

app.listen(port, async()=> {
  try {
    console.log(`listening on port ${port}`);
    await conn.sync({ force: true });
    const [
      lucy,
      moe,
      larry,
      ethyl,
      foo,
      bar,
      bazz,
      quq,
      nyc,
      paris,
      london,
      la
    ] = await Promise.all([
      Person.create({ name: 'lucy' }),
      Person.create({ name: 'moe' }),
      Person.create({ name: 'larry' }),
      Person.create({ name: 'ethyl' }),
      Thing.create({ name: 'foo' }),
      Thing.create({ name: 'bar' }),
      Thing.create({ name: 'bazz' }),
      Thing.create({ name: 'quq' }),
      Place.create({ name: 'NYC' }),
      Place.create({ name: 'Paris' }),
      Place.create({ name: 'London' }),
      Place.create({ name: 'LA' }),
    ]);

    await Promise.all([
      Souvenir.create({ personId: lucy.id, thingId: foo.id, placeId: london.id }),
      Souvenir.create( { personId: lucy.id, thingId: foo.id, placeId: la.id}),
    ]);
  }
  catch(ex){
    console.log(ex);
  }
});
