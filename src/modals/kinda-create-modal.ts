import { Modal, App, Setting, SuggestModal } from 'obsidian'
import { PersonCreateModal } from './person-create-modal';
import { Type, ALL_TYPES } from 'src/constants';

export class KindaCreateModal extends SuggestModal<Type> {
	// Returns all available suggestions.
	getSuggestions(query: string): Type[] {
		return ALL_TYPES.filter((type) =>
			type.name.includes(query.toLowerCase())
		);
	}

	// Renders each suggestion item.
	renderSuggestion(type: Type, el: HTMLElement) {
		el.createEl("div", { text: type.name });
		el.createEl("small", { text: type.description });
	}

	// Perform action on the selected suggestion.
	onChooseSuggestion(type: Type, evt: MouseEvent | KeyboardEvent) {
		console.log(type);
		new PersonCreateModal(this.app).open()
	}
}
