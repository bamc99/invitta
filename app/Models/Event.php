<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
    ];

    // guests relation
    public function guests()
    {
        return $this->hasMany(Guest::class);
    }
    // guests relation
    public function guestsCount()
    {
        return $this->guests()->count();
    }
}
