const { Videogame, conn, Genre } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' });
      });
    });
  });
});

 // Testing:
 
 describe('Validators', () => {
  beforeEach(() => Videogame.sync({ force: true }));
  describe('name', () => {
    it('should throw an error if name is null', (done) => {
      Videogame.create({})
        .then(() => done(new Error('It requires a valid name')))
        .catch(() => done());
    });
    it('should work when its a valid name', () => {
      Videogame.create({ name: 'Hola' });
    });
  });
});

describe('Validators', () => {
  beforeEach(() => Videogame.sync({ force: true }));
  describe('description', () => {
    it('should throw an error if description is null', (done) => {
      Videogame.create({})
        .then(() => done(new Error('It requires a valid description')))
        .catch(() => done());
    });
    it('should work when its a valid description', () => {
      Videogame.create({ description: 'Hola, soy la descripcion de Hola' });
    });
  });
});

describe('Validators', () => {
  beforeEach(() => Videogame.sync({ force: true }));
  describe('background_image', () => {
    it('should throw an error if background_image is null', (done) => {
      Videogame.create({})
        .then(() => done(new Error('It requires a valid link image')))
        .catch(() => done());
    });
    it('should work when its a valid link image', () => {
      Videogame.create({ background_image: 'https://blogs.unsw.edu.au/nowideas/files/2019/08/videojuegos-agilidad.jpg' });
    });
  });
});

describe('Validators', () => {
  beforeEach(() => Videogame.sync({ force: true }));
  describe('rating', () => {
    it('should throw an error if rating is null', (done) => {
      Videogame.create({})
        .then(() => done(new Error('It requires a valid rating')))
        .catch(() => done());
    });
    it('should work when its a valid rating', () => {
      Videogame.create({ rating: 4 });
    });
  });
});


describe('Genre model', function () {
  beforeEach(async function() {
    await Genre.sync({ force: true });
  });
      it('Should not be created without all required fields completed', function(done) {
      Genre.create({
        id: '1',
      })
      .then(() => done('Should not have been created, dude!'))
      .catch(() => done());
       });
    it('Name should be a string', function(){
      expect(typeof Genre.name).equal("string")
    })
  });