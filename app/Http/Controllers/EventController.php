<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::all();
        return Inertia::render('events/all', [
            'events' => $events
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        // get guests 
        $guests = $event->guests;
        return Inertia::render('events/single', [
            'event' => $event,
            'guests' => $guests
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }

    public function createFromJson(Request $request){
        $data = $request->validate([
            'event_title' => 'required|string',
            'event_description' => 'required|string',
            'guests' => 'required|array',
            'guests.*.first_name' => 'required|string',
            'guests.*.last_name' => 'string',
            'guests.*.phone' => 'required|string',
            'guests.*.childs' => 'array',
            'guests.*.childs.*.first_name' => 'required|string',
            'guests.*.childs.*.last_name' => 'required|string',
            'guests.*.childs.*.phone' => 'string',
        ]);

        $event = Event::create([
            'title' => $data['event_title'],
            'description' => $data['event_description'],
        ]);

        foreach ($data['guests'] as $guest) {
            $parent = $event->guests()->create([
                'first_name' => $guest['first_name'],
                'last_name' => $guest['last_name'],
                'phone' => $guest['phone'],
            ]);

            if (isset($guest['childs'])) {
                foreach ($guest['childs'] as $child) {
                    $parent->guests()->create([
                        'event_id' => $event->id,
                        'first_name' => $child['first_name'],
                        'last_name' => $child['last_name'],
                        'phone' => $child['phone'] ?? null,
                    ]);
                }
            }
        }

        // api response
        return response()->json([
            'message' => 'Event created successfully',
            'event' => $event,
        ], 201);
    }
}
