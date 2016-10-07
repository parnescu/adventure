class StatsHelper{
	constructor(){
		this.stats = [
			{
				label: "Total Age",
				type: "age",
				value: 0
			},
			{
				label: "Total Mana",
				type: "mana",
				value: 0
			},
			{
				label: "Empty Cages",
				type: "cages",
				value: 0
			}
		];
	}

	parseItems(creatures, setC, maxC){
		if (creatures){
			let data = creatures.reduce((d,{occupier})=>{
				if (occupier){
					d.age += occupier.age;
					d.mana += occupier.mana;
				}
				return d;
			}, {age: 0, mana: 0, cages: (maxC-setC)});

			this.stats[0].value = data.age;
			this.stats[1].value = data.mana;
		}
		this.stats[2].value = maxC-setC;
		return this.stats;
	}
}

export default new StatsHelper();