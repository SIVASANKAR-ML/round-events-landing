import frappe

@frappe.whitelist(allow_guest=True)
def submit_enquiry(full_name, phone, event_date=None, budget_range=None):
    doc = frappe.get_doc({
        "doctype": "RE Enquiry",
        "full_name": full_name,
        "phone": phone,
        "event_date": event_date,
        "budget_range": budget_range,
        "status": "New"
    })
    doc.insert(ignore_permissions=True)
    frappe.db.commit()

    return {"success": True, "message": "Enquiry submitted successfully."}