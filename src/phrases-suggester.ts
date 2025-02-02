import { App, FuzzyMatch, FuzzySuggestModal } from "obsidian";
import { PBSectionFuzzySuggestModal } from "src/section-suggester";
import PBPlugin, { Settings } from "src/main";
import { getActiveView } from "src/utils";

export class PBPhrasesFuzzySuggestModal extends FuzzySuggestModal<string> {
    app: App;
    plugin: PBPlugin;
    phrases: string[];
    settings: Settings;

    constructor(app: App, plugin: PBPlugin, phrases: string[], settings: Settings) {
        super(app);
        this.app = app;
        this.plugin = plugin
        this.phrases = [...phrases, 'BACK'];
        this.settings = settings;
    }

    getItems(): string[] {
        return this.phrases;
    }

    getItemText(item: string): string {
        return item;
    }

    renderSuggestion(item: FuzzyMatch<string>, el: HTMLElement) {
        super.renderSuggestion(item, el);
    }

    onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
        if (item === 'BACK') {
            this.close()
            new PBSectionFuzzySuggestModal(this.app, this.plugin, this.plugin.pb, this.settings).open()
        } else {
            try {
                const activeView = getActiveView(this.plugin);
                const activeEditor = activeView.editor;
                const editorRange = activeEditor.getCursor('from')
                activeEditor.replaceRange(item, editorRange)
            } catch (error) {
                console.log(error)
            }
        }
    }
}