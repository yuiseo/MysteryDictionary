package com.sinbangsa.data.entity;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
@Builder
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long reservationId;

    @ManyToOne
    @JoinColumn(name = "themetime_id")
    private ThemeTime themeTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User reservationUser;

    @Column
    @NotNull
    private String date;

    @Column
    @NotNull
    private Boolean accept=false;

    @Column
    private int status=0;

    @Builder


    public void update(int status) {
        this.status = status;
    }

    public void update(User user, int status) {
        this.reservationUser=user;
        this.status = status;
    }

    public void update(boolean accept) {
        this.accept = accept;
    }


}
