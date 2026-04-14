import frappe

@frappe.whitelist(allow_guest=True)
def get_career_openings():
    openings = frappe.get_all(
        "RE Career Opening",
        filters={"is_active": 1},
        fields=["name", "job_title", "employment_type", "location", "description"],
        order_by="creation desc"
    )
    return openings

@frappe.whitelist(allow_guest=True)
def submit_job_application(full_name, email, phone=None, position_applied=None, message=None):
    # Prevent duplicate applications for the same position
    if position_applied:
        existing = frappe.get_all(
            "RE Job Application",
            filters={"email": email, "position_applied": position_applied},
            limit=1
        )
        if existing:
            frappe.throw("You have already applied for this position.")

    doc = frappe.get_doc({
        "doctype": "RE Job Application",
        "full_name": full_name,
        "email": email,
        "phone": phone,
        "position_applied": position_applied,
        "message": message,
        "status": "New"
    })
    doc.insert(ignore_permissions=True)
    frappe.db.commit()

    return {"success": True, "message": "Application submitted successfully."}