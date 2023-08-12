import { App, Notice, Plugin, PluginSettingTab, Setting, } from 'obsidian';
import { KindaCreateModal } from './modals/kinda-create-modal';
import { ALL_TYPES, Type } from './constants';
// Remember to rename these classes and interfaces!

export interface KindaCreatePluginSettings {
	noteTypes: Type[];
}

export type PartialSettings = Partial<KindaCreatePluginSettings>;

const DEFAULT_SETTINGS: KindaCreatePluginSettings = {
	noteTypes: ALL_TYPES
}

export default class KindaCreatePlugin extends Plugin {
	settings: KindaCreatePluginSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('plus-circle', 'Kinda Create Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new KindaCreateModal(this).open();
		});

		// Perform additional things with the ribbon
		ribbonIconEl.addClass('kinda-create-plugin-ribbon-class');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-kinda-create-modal',
			name: 'Open kinda create modal',
			callback: () => {
				new KindaCreateModal(this).open();
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new KindaCreateSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	// Helper to get setting value (or the default setting value if not set)
	getSettingValue<K extends keyof KindaCreatePluginSettings>(key: K): PartialSettings[K] {
		return this.settings[key] ?? DEFAULT_SETTINGS[key];
	}

}

class KindaCreateSettingTab extends PluginSettingTab {
	plugin: KindaCreatePlugin;

	constructor(app: App, plugin: KindaCreatePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		this.plugin.settings.noteTypes.forEach((noteType, index) => {
			new Setting(containerEl)
				.setName(noteType.name)
				.setDesc(noteType.description)
				.addText(text => text
					.setValue(noteType.base_location)
					.onChange(async (value) => {
						const newNoteType: Type = {
							...noteType,
							base_location: value
						}
						this.plugin.settings.noteTypes[index] = newNoteType;
						await this.plugin.saveSettings();
					}));
		})
	}
}
