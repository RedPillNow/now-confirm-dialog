var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NowElements;
(function (NowElements) {
    var BasicAppLayout = (function (_super) {
        __extends(BasicAppLayout, _super);
        function BasicAppLayout() {
            _super.apply(this, arguments);
        }
        __decorate([
            property({ type: String })
        ], BasicAppLayout.prototype, "prop1", void 0);
        BasicAppLayout = __decorate([
            component('now-starter-element')
        ], BasicAppLayout);
        return BasicAppLayout;
    }(polymer.Base));
    NowElements.BasicAppLayout = BasicAppLayout;
})(NowElements || (NowElements = {}));
NowElements.BasicAppLayout.register();

//# sourceMappingURL=now-starter-element.js.map
