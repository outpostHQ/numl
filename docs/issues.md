# Known issues

* Frameworks can trigger `onConnected` method of NUDE Elements before it's connected to the DOM by attaching element to the parent (in memory). So be aware of that case while developing your own elements.
* [Theme system](./themes.md) and [Responsive system](./responsive.md) require elements to be connected to the dom before CSS can be generated because they require context. So it's possible that user will notice fast rerender of the page.
* [Theme system](./themes.md) currently don't reuse previously generated CSS for the new elements. So it's highly recommended to define themes once on the top-level NUDE Element.
