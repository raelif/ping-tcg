"use client";

import React from "react";
import { createComponent } from "@lit/react";
import { PokemonCard as PokemonCardLit } from "./PokemonCard";

export const PokemonCard = createComponent({
	tagName: "pokemon-card",
	elementClass: PokemonCardLit,
	react: React
});
