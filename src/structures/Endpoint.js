/**
 * Represents an api endpoint.
 * @author Lilly Rizuri
 * @date 27/06/2021
 * @class Endpoint
 */
class Endpoint {
	/**
	 * Creates an instance of Endpoint.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @param {string} endpoint
	 * @memberof Endpoint
	 */
	constructor(endpoint) {
		/**
		 * The endpoint type.
		 * @author Lilly Rizuri
		 * @date 27/06/2021
		 * @type {"get" | "post"}
		 * @memberof SamiDBApi
		 */
		this.type = endpoint.split(",")[0].toLowerCase();

		/**
		 * The endpoint type.
		 * @author Lilly Rizuri
		 * @date 27/06/2021
		 * @type {"get" | "post"}
		 * @memberof SamiDBApi
		 */
		this.url = endpoint.replace(RegExp(`(${this.type.toUpperCase()},OPTIONS,HEAD(\\s+)|\\/<(.+))`, "gi"), "");

		if (/\<(.+)/gi.test(endpoint)) {
			/**
			 * The endpoint type.
			 * @author Lilly Rizuri
			 * @date 27/06/2021
			 * @type {string[]}
			 * @memberof SamiDBApi
			 */
			this.subtypes = `${endpoint
				.replace(RegExp(`(${this.type.toUpperCase()},OPTIONS,HEAD(\s+)|<|>|'|.+(?=<))`, "gi"), "")
				.replace(/,/gi, "/,")}/`
				.split(",");
		}
	}

	/**
	 * Strings go brrr.
	 * @author Lilly Rizuri
	 * @date 27/06/2021
	 * @returns {string}
	 * @memberof Endpoint
	 */
	toString() {
		return `${this.url}`;
	}
}

module.exports = Endpoint;