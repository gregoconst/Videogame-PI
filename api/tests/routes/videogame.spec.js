/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: 'que onda',
  released: "2013-09-17",
  rating: 4,
  background_image: "https://blogs.unsw.edu.au/nowideas/files/2019/08/videojuegos-agilidad.jpg",
};

// describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Videogame.sync({ force: true })
//     .then(() => Videogame.create(videogame)));
//   describe('GET /videogames', () => {
//     it('should get 200', () =>
//       agent.get('/videogames').expect(200)
//     );
//   });
// });

describe('Videogame routes', () => {
  before(() =>
  conn.authenticate().catch((err) => {
    console.error("Can't reach Database", err)
  })
)

describe('/videogames', function() {
it('GET response with status 200', function(){
  return agent
    .get('/videogames')
    .expect(function(res){
      expect(res.status).equal(200)})
}).timeout(10000)
it('Elements received are Objects',  function() {
  return agent 
    .get('/videogames') 
    .expect(function(res) {
      expect(typeof res.body[0]).equal('object'); 
    });
}).timeout(10000)
})

describe('/videogames/:id', function() {
it('GET responses with status 200 if a game is found',  function() {
  return agent 
    .get('/videogames/432') 
    .expect(function(res){
      expect(res.status).equal(200)}); 
    }).timeout(10000);

})

});