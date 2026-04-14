import frappe

@frappe.whitelist(allow_guest=True)
def get_hero_slides():
    slides = frappe.get_all(
        "RE Hero Slide",
        filters={"is_active": 1},
        fields=["name", "title", "subtitle", "image", "sort_order"],
        order_by="sort_order asc"
    )
    return slides