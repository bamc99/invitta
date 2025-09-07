<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGuestRequest;
use App\Http\Requests\UpdateGuestRequest;
use App\Models\Guest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreGuestRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Guest $guest)
    {
        //
    }

    public function invitation(Guest $guest)
    {
        $guest->load('guests', 'event'); // <-- Asegúrate de cargar 'guests'
        return Inertia::render('events/invitation', [
            'guest' => $guest,
            'event' => $guest->event,
            'appUrl' => config('app.url'),
            'meta' => [
                'title' => "Yaz & Bruno - Invitación para {$guest->first_name}",
                'description' => 'Acompáñanos en un día muy especial: nuestra boda el 13 de Septiembre de 2025.',
                'image' => asset('meta_cover.webp'),
                'url' => route('invites.guests', $guest->id),
            ],
        ]);
    }

    public function afterInvitation()
    {
        return Inertia::render('events/after-invitation', [
            'appUrl' => config('app.url'),
            'meta' => [
                'title' => "Yaz & Bruno - Invitación para al after civil",
                'description' => 'Acompáñanos en un día muy especial: nuestra boda el 13 de Septiembre de 2025.',
                'image' => asset('meta_cover.webp'),
                'url' => route('after-invitation'),
            ],
        ]);
    }

    public function confirmations(Request $request)
    {
        $data = $request->validate([
            'confirmations' => 'required|array',
            'confirmations.*.id' => 'required|exists:guests,id',
            'confirmations.*.is_attending' => 'required|boolean',
        ]);

        foreach ($data['confirmations'] as $confirmation) {
            Guest::where('id', $confirmation['id'])->update([
                'is_attending' => $confirmation['is_attending'],
            ]);
        }

        return redirect()->back()->with('success', 'Confirmación registrada.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Guest $guest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGuestRequest $request, Guest $guest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guest $guest)
    {
        //
    }
}
