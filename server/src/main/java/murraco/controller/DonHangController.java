package murraco.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import murraco.dto.response.DonHangDTO;
import murraco.dto.response.DonHangResponse;
import murraco.mapper.DonHangMapper;
import murraco.model.DonHang;
import murraco.repository.DonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("users")
@Api(tags = "users")
@RequiredArgsConstructor
public class DonHangController {
    @Autowired
    private DonHangRepository donHangRepository;

    @Autowired
    private DonHangMapper donHangMapper;

    @GetMapping("/donhang")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public DonHangDTO searchOrders(String khachHangId, int offset,  int limit ) {
        Pageable pageable = PageRequest.of(offset, limit, Sort.by(Sort.Direction.ASC, "id"));
        DonHangDTO donHangDTO = new DonHangDTO();
        if (khachHangId.equals("")) {
            donHangDTO.setDonHangs(donHangMapper.listDonHangToListDonHangResponse(donHangRepository.findAll(pageable).getContent()));
            donHangDTO.setTotalCount(donHangRepository.findAll(pageable).getTotalElements());
        } else {
            donHangDTO.setDonHangs(donHangMapper.listDonHangToListDonHangResponse(donHangRepository.findAllOrders(khachHangId, pageable).getContent()));
            donHangDTO.setTotalCount(donHangRepository.findAllOrders(khachHangId, pageable).getTotalElements());
        }
        return donHangDTO;
    }

    @GetMapping("/donhang/{id}")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public DonHang getOrderDetail(@PathVariable int id) {
        return donHangRepository.findById(id).get();
    }

    @PutMapping("/donhang/thanhtoan/{id}")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public DonHang paymentOrder(@PathVariable int id) {
        DonHang donhangUpdate = donHangRepository.getById(id);
        donhangUpdate.setTrangThaiThanhToan("True");
        donhangUpdate.setNgayThanhToan(new Date());
        return donHangRepository.save(donhangUpdate);
    }
}
