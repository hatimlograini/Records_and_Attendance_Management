<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Releve extends Model
{

    protected $fillable = [
        'COD_RLR',
        'DATE_REL',
        'NBR_TOTAL_ORDER',
        'ANN_TRN',
        'PER_TRN',
        'ORDRE_LECTURE_PAQUET',
        'TOURNEE_DEBUT',
        'TOURNEE_FIN',
    ];
}
