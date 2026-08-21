
type DisposeFm = () => void;

export class ClScope {
    private disposables: (() => void)[] = [];
    private children: ClScope[] = [];
    private isDispose = false;

    track(dispose: DisposeFm) {
        if (this.isDispose) {
            dispose();
            return;
        }
        this.disposables.push(dispose);
    }

    createChild(): ClScope {
        const child = new ClScope();
        this.children.push(child);
        return child;
    }

    dispose() {
        if (this.isDispose) return;
        this.isDispose = true;

        for (const child of this.children) {
            child.dispose();
        }
        this.children = [];

        for (const d of this.disposables) {
            try {
                d()
            }
            catch (e) {
                console.warn("Scope dispose error:", e);
            }
        }

        this.disposables = [];
    }
}