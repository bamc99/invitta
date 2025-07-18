export interface AllEvents {
    data: Event[];
}
export interface Event {
    id:            number;
    title:         string;
    description:   string;
    start_date:    Date;
    end_date:      Date;
    start_time:    string;
    end_time:      string;
    maps_location: string;
    status:        string;
    created_at:    Date;
    updated_at:    Date;
}