<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRelevesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('releves', function (Blueprint $table) {
            $table->id();
            $table->string('COD_RLR');
            $table->integer('COUNT_DOWN_ORDER')->nullable();
            $table->date('DATE_REL');
            $table->integer('NBR_TOTAL_ORDER');
            $table->year('ANN_TRN');
            $table->integer('PER_TRN');
            $table->integer('ORDRE_LECTURE_PAQUET');
            $table->integer('TOURNEE_DEBUT');
            $table->integer('TOURNEE_FIN');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('releves');
    }
}
