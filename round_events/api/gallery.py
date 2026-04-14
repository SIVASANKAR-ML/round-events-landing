import frappe

@frappe.whitelist(allow_guest=True)
def get_gallery(category=None, featured_only=0):
    filters = {"is_active": 1}

    if category:
        filters["category"] = category
    if int(featured_only):
        filters["is_featured"] = 1

    images = frappe.get_all(
        "RE Gallery Image",
        filters=filters,
        fields=["name", "image", "alt_text", "category", "is_featured", "sort_order"],
        order_by="sort_order asc"
    )
    return images