import frappe

@frappe.whitelist(allow_guest=True)
def get_services():
    services = frappe.get_all(
        "RE Service",
        filters={"is_active": 1},
        fields=["name", "title", "slug", "tagline", "short_description", "image", "sort_order"],
        order_by="sort_order asc"
    )
    return services

@frappe.whitelist(allow_guest=True)
def get_service(slug):
    results = frappe.get_all(
        "RE Service",
        filters={"slug": slug, "is_active": 1},
        fields=["name", "title", "slug", "tagline", "short_description",
                "full_description", "image", "sort_order"],
        limit=1
    )
    if not results:
        frappe.throw("Service not found", frappe.DoesNotExistError)

    service = results[0]
    service["features"] = frappe.get_all(
        "RE Service Feature",
        filters={"parent": service["name"]},
        fields=["feature"],
        order_by="idx asc"
    )
    return service