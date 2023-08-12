import { Modal, App, Setting, Plugin } from 'obsidian'
import { ALL_TYPES } from 'src/constants';
import KindaCreatePlugin from 'src/main';

export class PersonCreateModal extends Modal {

	result: string;
	plugin: KindaCreatePlugin;

	constructor(plugin: KindaCreatePlugin) {
		super(plugin.app);
		this.plugin = plugin;
	}

	onOpen() {
		const { contentEl } = this;

		new Setting(contentEl)
			.setName("联系人名字")
			.addText((text) =>
				text.onChange((value) => {
					this.result = value
				}));

		new Setting(contentEl)
			.addButton((btn) =>
				btn
					.setButtonText("确定")
					.setCta()
					.onClick(() => {
						const index = ALL_TYPES.findIndex(item => item.name === "联系人")
						if (this.plugin.getSettingValue("noteTypes")) {
							try {
								this.app.vault.create(this.plugin.getSettingValue("noteTypes")[index].base_location + `/${this.result}.md`, "")
							} catch {
								new Notification("文件已存在");
							}
						}
						this.close();
					}));

	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
