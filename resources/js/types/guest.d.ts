export interface Guest {
    id:              number;
    first_name:      string;
    last_name:       string;
    email:           string;
    phone:           string;
    event_id:        number;
    parent_guest_id: number | null;
    is_attending:    null | boolean;
    created_at:      Date;
    updated_at:      Date;
    guests?:         Guest[];
    event?:          Event;
}