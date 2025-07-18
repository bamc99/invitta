<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Guest;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // create bruno.cuentas99@gmail.com  user
        User::factory()->create([
            'name' => 'Bruno Cuentas',
            'email' => 'bruno.cuentas99@gmail.com',
            'password' => '141621.Dj', 
        ]);
        // 10 guest per event
        $events = Event::factory(10)->create();
        foreach ($events as $event) {
            Guest::factory(10)->create([
                'event_id' => $event->id,
            ]);
        }
    }
}
