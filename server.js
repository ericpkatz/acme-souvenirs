const express = require('express');
const app = express();
const db = require('./db');
const { Place, Thing, Souvenir, Person, conn } = db;


app.get('/', async(req, res, next)=> {
  try {
    const people = await Person.findAll();
    const places = await Place.findAll();
    const things = await Thing.findAll();
    res.send(`
      <html>
        <head>
          <title>Acme Souvenirs</title>
        </head>
        <body>
          <h1>Acme Souvenirs</h1>
          <h2>People</h2>
          <ul>
            ${
              people.map( person => {
                return `
                  <li>
                    ${ person.name }
                  </li>
                `;
              }).join('')
            }
          </ul>
          <h2>Places</h2>
          <ul>
            ${
              places.map( place => {
                return `
                  <li>
                    ${ place.name }
                  </li>
                `;
              }).join('')
            }
          </ul>
          <h2>Things</h2>
          <ul>
            ${
              things.map( thing => {
                return `
                  <li>
                    ${ thing.name }
                  </li>
                `;
              }).join('')
            }
          </ul>
        </body>
      </html>
    `);

  }
  catch(ex){
    next(ex);
  }
});
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
