import frappe

@frappe.whitelist(allow_guest=True)
def get_awards():
    awards = frappe.get_all(
        "RE Award",
        filters={"is_active": 1},
        fields=["name", "title", "issuing_body", "icon", "sort_order"],
        order_by="sort_order asc"
    )
    return awards