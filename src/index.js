const { default: axios } = require("axios"),
	Endpoint = require("./structures/Endpoint");

/**
 * @author Lilly Rizuri
 * @date 27/06/2021
 * @typedef {object} Options
 * 	Api Options
 * @property {number} [version=1]
 * 	The api version.
 * @property {string} [apiURL="http://api.samidb.xyz"]
 * 	The url of the api.
 * @property {boolean} [ignoreDefaultEndpoints=false]
 * 	Whether to ignore the defualt api endpoints.
 * @property {{ get: string[], post: string[] }} [endpoints]
 *	The endpoints for the api.
 */

/**
 * The API handler.
 * @author Lilly Rizuri
 * @date 27/06/2021
 * @class SamiDBApi
 */
class SamiDBApi {

	/**
	 * Creates an instance of SamiDBApi.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @param {Options} [options={}]
	 * @memberof SamiDBApi
	 */
	constructor(options = {}) {
		/**
		 * The options for the api.
		 * @author Lilly Rizuri
		 * @date 27/06/2021
		 * @type {Options}
		 * @memberof SamiDBApi
		 */
		this.options = {
			version: 1,
			apiURL: "http://api.samidb.xyz",
			ignoreDefaultEndpoints: false,
			endpoints: [],
			...options,
		};

		/**
		 * The endpoints for the api.
		 * @author Lilly Rizuri
		 * @date 27/06/2021
		 * @type {{ get: import("./structures/Endpoint")[], post: import("./structures/Endpoint")[] }}
		 * @memberof SamiDBApi
		 */
		this.endpoints = {
			get: [],
			post: [],
		};

		if (!options.ignoreDefaultEndpoints) {
			this.#getDefaultEndpoints();
		}

		this.#setCustomEndpoints();
	}

	/**
	 * Gets an endpoint.
	 * @method
	 * @name SamiDBApi#get
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @param {string} endpoint
	 * @param {string} [subtype]
	 * @memberof SamiDBApi
	 */
	async get(endpoint, subtype) {
		const _endpoint = Object.values(this.endpoints).flat().find(e => [`/${endpoint}`, `/v${this.options.version}/${endpoint}`].indexOf(e.url) !== -1);
		if (_endpoint === void 0) {
			throw new ReferenceError("Unknown endpoint");
		}
		const data = (await axios[_endpoint.type](`${this.getURL(endpoint)}${subtype !== void 0 ? `/${subtype}` : ""}`)).data;

		return data?.url || data;
	}

	/**
	 * Gets the URL for an endpoint.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @param {string} apiEndpoint
	 * 	The endpoint to get.
	 * @returns {string}
	 * @memberof SamiDBApi
	 */
	getURL(apiEndpoint) {
		return `${this.options.apiURL}/v${this.options.version}/${apiEndpoint}`;
	}

	/**
	 * Sets the custom endpoints.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @returns {void}
	 * @memberof SamiDBApi
	 */
	#setCustomEndpoints() {
		Object.entries(this.options.endpoints).forEach(([type, endpoints]) => {
			if (this.endpoints?.[type] === void 0) {
				throw new ReferenceError("Unknown endpoint type.");
			}
			this.endpoints[type].push(...endpoints.map(endpoint => new Endpoint(endpoint)));
		});

		return;
	}

	/**
	 * Sets the default endpoints.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @returns {void}
	 * @async
	 * @memberof SamiDBApi
	 */
	async #getDefaultEndpoints() {
		const { data } = await axios.get(this.getURL("endpoints")).catch(() => {
			throw new Error("Couldn't get the default api endpoints. (Likely something to do with the api itself");
		});

		try {
			data.forEach(endpoint => {
				this.endpoints[endpoint.split(",")[0].toLowerCase()]
					.push(new Endpoint(endpoint));
			});
		} catch {
			throw new Error("Couldn't get the default api endpoints. (Likely something to do with the api itself");
		}
		return;
	}

	/**
	 * Gets a Random blush gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get blush() {
		return this.get("img", "blush");
	}

	/**
	 * Gets a Random bonk gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get bonk() {
		return this.get("img", "bonk");
	}

	/**
	 * Gets a Random boop gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get boop() {
		return this.get("img", "boop");
	}

	/**
	 * Gets a Random cry gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get cry() {
		return this.get("img", "cry");
	}

	/**
	 * Gets a Random cuddle gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get cuddle() {
		return this.get("img", "cuddle");
	}

	/**
	 * Gets a Random grouphug gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get grouphug() {
		return this.get("img", "grouphug");
	}

	/**
	 * Gets a Random hug gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get hug() {
		return this.get("img", "hug");
	}

	/**
	 * Gets a Random kiss gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get kiss() {
		return this.get("img", "kiss");
	}

	/**
	 * Gets a Random lick gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get lick() {
		return this.get("img", "lick");
	}

	/**
	 * Gets a Random nom gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get nom() {
		return this.get("img", "nom");
	}

	/**
	 * Gets a Random pat gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get pat() {
		return this.get("img", "pat");
	}

	/**
	 * Gets a Random slap gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get slap() {
		return this.get("img", "slap");
	}

	/**
	 * Gets a Random smile gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get smile() {
		return this.get("img", "smile");
	}

	/**
	 * Gets a Random nuggies gif.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get nuggies() {
		return this.get("img", "nuggies");
	}

	/**
	 * Gets a Random corn image.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @readonly
	 * @type {Promise.<string>}
	 * @memberof SamiDBApi
	 */
	get corn() {
		return this.get("img", "corn");
	}

	/**
	 * Strings go brrr.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @returns {string}
	 * @memberof SamiDBApi
	 */
	toString() {
		return "[SamiDBApi]";
	}
}

module.exports = SamiDBApi;