import {setVideogamesGenres, setVideogamesOrigin, setVideogamesRating, setVideogamesOrder } from "./actions/index.js";

describe("Reducer-Actions Tests:", () => {

it('It should return an action with props type "SET_FILTER_VIDEOGAMES_GENRES" & payload, the value is send as an argument:', () => {
expect(setVideogamesGenres("Shooter")).toEqual({
type: "SET_FILTER_VIDEOGAMES_GENRES",
payload: "Shooter",
});
});

it('It should return an action with the props type "SET_FILTER_VIDEOGAMES_ORIGIN" & payload, the value is send as an argument:', () => {
expect(setVideogamesOrigin("VideogamesDB")).toEqual({
type: "SET_FILTER_VIDEOGAMES_ORIGIN",
payload: "VideogamesDB",
});
});

it('It should return an action with the props type "SET_FILTER_VIDEOGAMES_ORDER" & payload, the value is send as an argument:', () => {
expect(setVideogamesOrder("asc")).toEqual({
type: "SET_FILTER_VIDEOGAMES_ORDER",
payload: "asc",
});
}); 

it('It should return an action with the props type "SET_FILTER_VIDEOGAMES_RATING" & payload, the value is send as an argument:', () => {
expect(setVideogamesRating("low")).toEqual({
type: "SET_FILTER_VIDEOGAMES_RATING",
payload: "low",
});
});

});