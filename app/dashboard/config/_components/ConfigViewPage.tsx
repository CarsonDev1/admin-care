'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FaStar } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import React, { useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ConfigViewPage: React.FC = () => {
  const [services, setServices] = useState<string[]>([
    'Sửa chữa tại nhà, giao máy miễn phí.',
    'Sửa chữa nhanh, lấy liền.',
    'Mượn điện thoại miễn phí.',
    'Kiểm tra – vệ sinh máy miễn phí.',
    'Sửa đúng bệnh – Báo đúng giá.',
    'Hoàn tiền lại nếu khách không hài lòng.',
    "Bảo hành 'Rơi vỡ – Vô nước'"
  ]);

  const [promotions, setPromotions] = useState<string[]>([
    '[HOT] Tặng cáp sạc, dán cường lực cao cấp khi thay pin Pisen chính hãng cho iPhone. Áp dụng từ ngày 01/11 đến 30/11.',
    '[HOT] Tặng cốc sạc cấp tốc thay pin ORIZIN chính hãng cho iPhone, iPad. Áp dụng từ ngày 01/11 đến 31/11.',
    '[HOT THÁNG 11] Tháng Tri Ân – Thay Pin giảm đến 50%. Tham gia vòng quay săn phụ kiện 0đ.',
    'Cà thẻ miễn phí.',
    'Giảm lên đến 50% cho khách hàng tham gia mua gói BHTĐ cho những máy sửa chữa tại TTBH Bạch Long Care.',
    'Tặng thẻ VIP cho khách hàng thân thiết.',
    'Linh kiện sỉ – giá tốt nhất. Liên hệ ngay.',
    'Nhận đào tạo học viên miễn phí.'
  ]);

  const [newService, setNewService] = useState<string>('');
  const [newPromotion, setNewPromotion] = useState<string>('');

  const addService = (): void => {
    if (newService.trim()) {
      setServices([...services, newService]);
      setNewService('');
    }
  };

  const addPromotion = (): void => {
    if (newPromotion.trim()) {
      setPromotions([...promotions, newPromotion]);
      setNewPromotion('');
    }
  };

  const updateService = useCallback((index: number, value: string) => {
    setServices((prevServices) => {
      const updatedServices = [...prevServices];
      updatedServices[index] = value;
      return updatedServices;
    });
  }, []);

  const updatePromotion = useCallback((index: number, value: string) => {
    setPromotions((prevPromotions) => {
      const updatedPromotions = [...prevPromotions];
      updatedPromotions[index] = value;
      return updatedPromotions;
    });
  }, []);

  const removeService = (index: number): void => {
    setServices(services.filter((_, i) => i !== index));
  };

  const removePromotion = (index: number): void => {
    setPromotions(promotions.filter((_, i) => i !== index));
  };

  const quillModules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }], // Text color and background color
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const quillFormats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'list',
    'bullet',
    'align',
    'link',
    'image'
  ];

  return (
    <div className="rounded-lg p-4 text-white">
      <Accordion type="single" collapsible>
        <AccordionItem value="services">
          <AccordionTrigger>
            <h3 className="text-lg font-semibold text-zinc-800">Dịch vụ</h3>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="mb-4 max-h-96 space-y-2 overflow-y-auto">
              {services.map((service, index) => (
                <li key={index} className="flex w-full items-center gap-2">
                  <div className="flex w-3/4 items-center gap-5">
                    <FaStar className="text-yellow-500" size={20} />
                    <ReactQuill
                      value={service}
                      onChange={(value) => updateService(index, value)}
                      className="mr-2 w-full text-black"
                      theme="snow"
                      modules={quillModules}
                      formats={quillFormats}
                    />
                  </div>
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => removeService(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-center gap-4">
              <ReactQuill
                value={newService}
                onChange={setNewService}
                placeholder="Enter new service"
                className="w-full text-black"
                theme="snow"
                modules={quillModules}
                formats={quillFormats}
              />
              <Button
                variant="outline"
                onClick={addService}
                className="rounded-lg bg-yellow-500 px-3 py-1 font-bold"
              >
                Add
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="promotions">
          <AccordionTrigger>
            <h3 className="text-lg font-semibold text-zinc-800">Khuyến mãi</h3>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="mb-4 max-h-96 space-y-2 overflow-y-auto">
              {promotions.map((promotion, index) => (
                <li key={index} className="flex w-full items-center gap-2">
                  <div className="flex w-3/4 items-center gap-5">
                    <GoDotFill className="text-black" size={20} />
                    <ReactQuill
                      value={promotion}
                      onChange={(value) => updatePromotion(index, value)}
                      className="mr-2 w-full text-black"
                      theme="snow"
                      modules={quillModules}
                      formats={quillFormats}
                    />
                  </div>
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => removePromotion(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-center gap-4">
              <ReactQuill
                value={newPromotion}
                onChange={setNewPromotion}
                placeholder="Enter new promotion"
                className="w-full text-black"
                theme="snow"
                modules={quillModules}
                formats={quillFormats}
              />
              <Button
                variant="outline"
                onClick={addPromotion}
                className="rounded-lg bg-yellow-500 px-3 py-1 font-bold"
              >
                Add
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ConfigViewPage;
