// A function from set F to set G
function FtoG(set, transformation) {
	
	// Set defaults internal values and functions...
	this._transformation = transformation || function(value) {
		return value;
	};

	this._f = set || [];

	// Setters...
	this.setT = function(_transformation) {
		this._transformation = _transformation;
	};

	this.setF = function(f) {
		// remove duplicates
		f = f.filter(function(element, index, self) {
			return self.indexOf(element) == index;
		});

		this._f = f;
	};
	

	// The set G
	this.g = function() {
		var that = this;
		return this._f.map(function(element, index) {
			return that._transformation(element);
		});
	};

	// Is F -> G isomorphic?
	// That is f: F -> G and g: G -> F,
	// the composition of f and g = identity(G) and
	// the composition of g and f = identity(F)
	// f is invertible and g is the inverse of f
	this.isIsomorphic = function() {
		var g = this.g();
		var isomorphic = true;
		g.filter(function(element, index, self) {
			if (isomorphic && self.indexOf(element) !== index) {
				isomorphic = false;
				return false;
			}

			return self.indexOf(element) == index;
		});

		return isomorphic;
	};
}

var f = new FtoG();
f.setF([1,2,3,4,5]);
f.setT(function(val) {
	return val % 3;
});

console.log(f.g()); // [1, 2, 0, 1, 2]
console.log(f.isIsomorphic()); // false

f.setT(function(val) {
	return val * 3;
});

console.log(f.g()); // [3, 6, 9, 12, 15]
console.log(f.isIsomorphic()); // true