import React from 'react';
import Request from 'superagent';
import _ from 'lodash';

class App extends React.Component {
	
	constructor() {
		super();
		this.state = {};
	}

	componentWillMount() {
		this.nextPage();
		this.filterList();
	}

	nextPageProcess(next) {
		this.nextPage(next);
	}

	prevPageProcess(prev) {
		this.nextPage(prev);
	}

	pokemonDetailProcess(urlDetail) {
		this.pokemonDetail(urlDetail);
	}

	filterPokemonProcess(habitatUrl) {
		this.filterPokemon(habitatUrl);
	}


	render() {
		var pokemons = _.map(this.state.pokemons, (pokemon) => {
			return <li><a href="#" onClick={ (e) => { this.pokemonDetailProcess(pokemon.url); } }>{pokemon.name}</a></li>
		});

		var pokemonFilter = _.map(this.state.pokemonFilter, (filter) => {
			return <li>{filter.name}</li>
		});

		var abilities = _.map(this.state.abilities, (ability) => {
			return <li>{ability.ability.name}</li>
		});

		var stats = _.map(this.state.stats, (stat) => {
			return <li>{stat.stat.name} {stat.base_stat}</li>
		});

		var habitat = _.map(this.state.pokemonHabitat, (habit) => {
			return <option value={habit.url}>{habit.name}</option>
		});

		var img = this.state.img;
		var pokemonName = this.state.pokemonName;
		var pokemonWeight = this.state.pokemonWeight;
		var pokemonHeight = this.state.pokemonHeight;


		return (
			<div>
				<div id="float-left">
					<h1>Pokémon List</h1>
					<p>Klik nama pokemon dibawah ini</p>
					<p>untuk mengetahui data pokemon</p>
					<button ref="prev" onClick={ (e) => { this.prevPageProcess(this.state.previous); } }>Previouse</button> <button ref="next" onClick={ (e) => { this.nextPageProcess(this.state.next); } }>Next</button>
					<ul>{pokemons}</ul>
					<h1>Pokédex data</h1>
					<img src={img} />
					<p>Name: {pokemonName}</p>
					<p>Weight: {pokemonWeight} Kg</p>
					<p>Height: {pokemonHeight / 10}m</p>
					<p>Abilities:</p>
					<ul>
						{abilities}
					</ul>
					<h1>Base stats</h1>
					<ul>
						{stats}
					</ul>
				</div>
				<div id="float-left2">
					<h1>Filter By Habitat</h1>
					<select onChange={ (e) => { this.filterPokemonProcess(e.target.value); } }>
						<option>Pilih Habitat</option>
						{habitat}
					</select>
					<ul>
						{pokemonFilter}
					</ul>
				</div>
			</div>
		)
	}

	/*fungsi untuk next dan previous data pokemon list*/
	nextPage(url = "http://pokeapi.co/api/v2/pokemon/?limit=10&offset=0") {
		Request.get(url).then((response) => {
			this.setState({
				pokemons: response.body.results,
				total: response.body.count,
				next: response.body.next,
				previous: response.body.previous
			});
		});
	}

	/*fungsi untuk menampilkan data detail pokemon*/
	pokemonDetail(urlDetail) {
		Request.get(urlDetail).then((response) => {
			this.setState({
				pokemonName: response.body.name,
				pokemonWeight: response.body.weight,
				pokemonHeight: response.body.height,
				urlSpecies: response.body.species.url,
				img: response.body.sprites.front_default,
				abilities: response.body.abilities,
				stats: response.body.stats
			});
		});
	}

	/*fungsi untuk menampilkan filter habitat*/
	filterList() {
		var url = "http://pokeapi.co/api/v2/pokemon-habitat/";
		Request.get(url).then((response) => {
			this.setState({
				pokemonHabitat: response.body.results
			});
		});
	}

	/*fungsi untuk mem filter berdasarkan habitat*/
	filterPokemon(habitatUrl) {
		Request.get(habitatUrl).then((response) => {
			this.setState({
				pokemonFilter: response.body.pokemon_species
			});
		});
	}
}

React.render(<App />, document.getElementById('app'));
