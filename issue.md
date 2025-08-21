Console Error

`DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users.

If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/dialog

src\components\ui\sheet.tsx (58:7) @ SheetContent

56 | <SheetPortal>
57 | <SheetOverlay />

> 58 | <SheetPrimitive.Content

     |       ^

59 | data-slot="sheet-content"
60 | className={cn(
61 | "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
Call Stack
75

Show 69 ignore-listed frame(s)
SheetContent
src\components\ui\sheet.tsx (58:7)
SheetPortal
src\components\ui\sheet.tsx (28:10)
SheetContent
src\components\ui\sheet.tsx (56:5)
Cart
src\components\common\cart.tsx (17:7)
Header
src\components\common\header.tsx (84:9)
Home
src\app\page.tsx (29:7)
