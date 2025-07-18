export interface Guest {
    id:              number;
    first_name:      string;
    last_name:       string;
    email:           string;
    phone:           string;
    event_id:        number;
    parent_guest_id: null;
    is_attending:    null;
    created_at:      string;
    updated_at:      string;
}