import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("pokemon-card")
export class PokemonCard extends LitElement {
	@property({ type: String }) id = "";
	@property({ type: String }) name = "";
	@property({ type: String }) image = "";

	static styles = css`
		:host {
			display: block;
			border: 1px solid #ddd;
			border-radius: 12px;
			text-align: center;
			background: #f9f9f9;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		}
		p {
			font-size: 18px;
			font-weight: 600;
			line-height: 1.5;
			text-align: center;
			text-transform: capitalize;
			margin: 8px 2px;
		}
		div {
			position: relative;
			padding: 16px;
		}
		img {
			width: 100%;
			height: auto;
			border-radius: 0.25rem;
		}
	`;

	render() {
		return html`
			<p>${this.name}</p>
			<div>
				<img
					src="${this.image}"
					alt="${this.name}"
					width="600"
					height="825"
				/>
			</div>
		`;
	}
}
